# OpenClaw 安装教程视频（Remotion）

这个目录提供了一个可直接编辑的 Remotion 项目，用于生成 **OpenClaw 安装教程** 视频。

## 1) 安装依赖

```bash
cd remotion-openclaw
npm install
```

## 2) 本地预览

```bash
npm run dev
```

启动后在 Remotion Studio 中打开 `OpenClawInstall` 组合，逐帧检查文案与动画。

## 3) 导出视频

```bash
npm run render
```

输出文件默认是：

```text
out/openclaw-install.mp4
```

## 4) 修改教程内容

主要编辑文件：

- `src/scenes/OpenClawInstallVideo.tsx`
  - 调整 `scenes` 数组中的标题、副标题、步骤文案
  - 可修改 `SCENE_DURATION` 来调节每页停留时间
- `src/components/SceneLayout.tsx`
  - 调整背景、字体、动效

## 5) 替换为你真实的 OpenClaw 命令

当前命令为通用示例（如 `python main.py` / `npm run dev`）。
建议按你正在使用的 OpenClaw 仓库 README，替换为真实安装和启动命令，视频会更准确。
