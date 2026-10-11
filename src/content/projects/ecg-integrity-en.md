---
lang: "en"
title: "On-Device Data Integrity Detection for Wearable ECG (nRF5340)"
description: "Decide on the device whether ECG data is intact and upload only valid data over BLE: an SVM with 100% test accuracy, about 1 ms per inference, and 13.7% lower overall power consumption."
date: 2025-10-01
endDate: 2026-04-01
role: "Final Year Project"
tags: ["nRF5340", "Zephyr", "TinyML", "BLE"]
stack:
  - "nRF5340"
  - "Zephyr / nRF Connect SDK"
  - "TensorFlow Lite Micro"
  - "BLE (Nordic UART Service)"
  - "C / C++"
  - "Python"
metrics:
  - { label: "SVM test accuracy", value: "100%" }
  - { label: "Per on-board inference", value: "~1 ms" }
  - { label: "Lower overall power use", value: "13.7%" }
  - { label: "Model configs compared", value: "26" }
repo: "https://github.com/torchpycharm/FYP_Embedded-Implementation-of-Data-Integrity-Detection-for-Wearable-ECG-Devices"
cover: "/projects/ecg-integrity/cover.jpg"
featured: true
videos: []
# Example videos (the three types can be mixed; they show above the body in this order):
# videos:
#   - { type: "bilibili", id: "BV1xx411c7mD", title: "Running on the board" }
#   - { type: "youtube", id: "xxxxxxxxxxx", title: "Demo" }
#   - { type: "file", src: "/projects/ecg-integrity/demo.mp4", poster: "/projects/ecg-integrity/demo-poster.jpg", title: "Live waveform page" }
---

## Problem

In long-term monitoring with wearable ECG devices, the recorded signal can become distorted. Distorted data has no analytical value, and uploading all of it over Bluetooth anyway only wastes power.

This project moves the decision onto the device: judge on the board whether a segment of ECG data is intact, and send out only the valid data.

## Results

- The full pipeline runs on the nRF5340, from data input through feature extraction and model inference to BLE transmission.
- 13 algorithms were compared in both float and INT8 form, 26 model configurations in total, and an SVM was selected: 100% test accuracy and about 1 ms per inference on the nRF5340.
- With a BLE strategy that sends only intact data, overall power consumption dropped by 13.7%.

## Pipeline

<picture>
  <source media="(max-width: 520px)" srcset="/projects/ecg-integrity/pipeline-en-narrow.svg" />
  <img src="/projects/ecg-integrity/pipeline-en.svg" alt="ECG data integrity detection pipeline" loading="lazy" decoding="async" />
</picture>

1. A host PC feeds 300 Hz ECG data in over UART.
2. The interrupt handler parses the data frames and puts them into a ring buffer.
3. Data is split into windows per record: at most 12,000 samples, typically 9,000 samples, which is 30 s.
4. When a window is ready, a snapshot is taken and handed to a worker thread, so acquisition is never blocked.
5. The worker thread runs feature extraction and model inference.
6. Only windows judged valid are sent over BLE, split into START / DATA / END packets.

## Feature extraction

Each window goes through four steps: remove the mean, drop the first second, downsample by 4, and split into three segments. Kurtosis and skewness are computed for each segment, giving 6 features in total.

## Model comparison

13 algorithms, each in a float and an INT8 version, for 26 configurations:

- An FNN plus its bagging ensemble and gradient boosting ensemble, 3 in total, built on TensorFlow Lite Micro
- 1-NN, decision tree, SVM, naive Bayes, LDA, tree ensemble, and gradient-boosted trees, 7 in total
- 3 fusion strategies

The dataset has 512 training samples and 55 test samples, all with 6 features. The SVM was the final choice.

## Test platform

To put the model comparison on solid ground, I built a complete hardware and software test platform:

- It compares each model's accuracy, inference time, and power consumption on the board.
- The BLE receiver on the PC includes a live waveform web page and can save every window as a CSV file.

## Takeaways

- Keep acquisition and computation apart: the interrupt only parses frames and writes to the buffer, while the expensive feature extraction and inference run on a worker thread, so acquisition is never blocked.
- Compare models on the board: the 26 configurations were judged by accuracy, inference time, and power consumption measured on the hardware.
- Filtering out invalid data on the device pays off: sending only intact data cut overall power consumption by 13.7%, while the on-device decision itself costs only about 1 ms per inference.
