---
lang: "zh"
title: "基于边缘计算的可穿戴 ECG 数据完整性检测系统"
description: "在设备端先判断心电数据是否完整，只把有效数据通过 BLE 上传：SVM 测试准确率 100%，单次推理约 1 ms，整体功耗降低 13.7%。"
date: 2025-10-01
endDate: 2026-04-01
role: "本科毕业设计"
tags: ["nRF5340", "Zephyr", "TinyML", "BLE"]
stack:
  - "nRF5340"
  - "Zephyr / nRF Connect SDK"
  - "TensorFlow Lite Micro"
  - "BLE (Nordic UART Service)"
  - "C / C++"
  - "Python"
metrics:
  - { label: "SVM 测试准确率", value: "100%" }
  - { label: "板上单次推理", value: "约 1 ms" }
  - { label: "整体功耗降低", value: "13.7%" }
  - { label: "对比的模型配置", value: "26 种" }
repo: "https://github.com/torchpycharm/FYP_Embedded-Implementation-of-Data-Integrity-Detection-for-Wearable-ECG-Devices"
cover: "/projects/ecg-integrity/cover.jpg"
featured: true
videos: []
# videos 的写法示例（三种类型可以混用，按顺序显示在正文上方）：
# videos:
#   - { type: "bilibili", id: "BV1xx411c7mD", title: "板上运行演示" }
#   - { type: "youtube", id: "xxxxxxxxxxx", title: "Demo" }
#   - { type: "file", src: "/projects/ecg-integrity/demo.mp4", poster: "/projects/ecg-integrity/demo-poster.jpg", title: "实时波形网页" }
---

## 问题

可穿戴心电设备在长期监测中，采集到的信号会出现失真。失真的数据没有分析价值，如果仍然全部通过蓝牙上传，只是白白耗电。

这个项目把判断放到设备端：先在板上判断一段心电数据是否完整，只把有效的数据传出去。

## 结果

- 在 nRF5340 上跑通了从数据接入、特征提取、模型推理到 BLE 发送的完整流程。
- 对比了 13 种算法、浮点和 INT8 两种形式，共 26 种模型配置，最终选定 SVM：测试准确率 100%，在 nRF5340 上单次推理约 1 ms。
- 采用「只传完整数据」的 BLE 传输策略后，整体功耗降低 13.7%。

## 系统流水线

<picture>
  <source media="(max-width: 520px)" srcset="/projects/ecg-integrity/pipeline-zh-narrow.svg" />
  <img src="/projects/ecg-integrity/pipeline-zh.svg" alt="ECG 数据完整性检测流水线" loading="lazy" decoding="async" />
</picture>

1. 上位机通过 UART 送入 300 Hz 的心电数据。
2. 在中断里解析数据帧，放入环形缓冲。
3. 按记录切分窗口：最长 12000 点，典型长度 9000 点，也就是 30 s。
4. 窗口就绪后做一次快照，交给工作线程处理，采集不会被阻塞。
5. 工作线程完成特征提取和模型推理。
6. 只有被判为有效的窗口才通过 BLE 发送，分成 START / DATA / END 三种包。

## 特征提取

每个窗口依次做四步处理：去均值、去掉第 1 秒、4 倍降采样、分成三段。每一段计算峰度和偏度，一共得到 6 维特征。

## 模型对比

13 种算法，每种都有浮点和 INT8 两个版本，共 26 种配置：

- FNN，以及它的 bagging 集成和 gradient boosting 集成，共 3 种，基于 TensorFlow Lite Micro
- 1-NN、决策树、SVM、朴素贝叶斯、LDA、树集成、梯度提升树，共 7 种
- 3 种融合策略

数据集有 512 条训练样本和 55 条测试样本，都是 6 维特征。最终选定的是 SVM。

## 测试平台

为了让模型对比有依据，搭了一套完整的软硬件验证平台：

- 在板上对比各个模型的准确率、推理时间和功耗。
- PC 端的 BLE 接收程序带一个实时波形网页，可以把每个窗口保存成 CSV。

## 收获

- 采集和计算要分开：中断里只解析数据帧、写缓冲，耗时的特征提取和推理交给工作线程，采集才不会被阻塞。
- 模型要放到板上比：26 种配置最后是按板上实测的准确率、推理时间和功耗来选的。
- 在端侧先筛掉无效数据是值得的：只传完整数据让整体功耗降低了 13.7%，而端侧判断本身一次推理只要约 1 ms。
