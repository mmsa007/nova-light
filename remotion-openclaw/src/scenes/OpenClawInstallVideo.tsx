import type {FC} from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {SceneLayout} from '../components/SceneLayout';

type OpenClawInstallVideoProps = {
  title: string;
};

const scenes = [
  {
    title: 'OpenClaw 安装教程',
    subtitle: '5 分钟完成从下载到启动',
    bullets: ['环境：Windows / Linux / macOS', '目标：本地成功启动 OpenClaw']
  },
  {
    title: '步骤 1：准备依赖',
    subtitle: '先检查必备工具版本',
    bullets: ['安装 Git', '安装 Python 3.10+', '安装 Node.js 18+（如需前端）']
  },
  {
    title: '步骤 2：克隆仓库',
    subtitle: '获取 OpenClaw 源代码',
    bullets: ['git clone <OpenClaw 仓库地址>', 'cd openclaw', '阅读 README 的平台说明']
  },
  {
    title: '步骤 3：安装依赖',
    subtitle: '根据项目包管理器执行',
    bullets: ['Python: pip install -r requirements.txt', 'Node: npm install 或 pnpm install', '处理报错后再继续']
  },
  {
    title: '步骤 4：配置环境变量',
    subtitle: '复制并编辑配置模板',
    bullets: ['cp .env.example .env', '填写 API Key / 数据库地址', '不要把 .env 提交到仓库']
  },
  {
    title: '步骤 5：启动服务',
    subtitle: '验证是否安装成功',
    bullets: ['后端：python main.py（示例）', '前端：npm run dev（示例）', '浏览器访问 http://localhost:3000']
  },
  {
    title: '常见问题排查',
    subtitle: '安装失败时优先检查这些项',
    bullets: ['端口被占用：更换端口或关闭冲突进程', '依赖安装慢：更换镜像源', '权限问题：使用虚拟环境或管理员权限']
  },
  {
    title: '完成！',
    subtitle: '你已经可以开始体验 OpenClaw',
    bullets: ['建议：立刻跑一个最小 Demo', '建议：记录版本与配置，方便团队复现']
  }
] as const;

const SCENE_DURATION = 110;

export const OpenClawInstallVideo: FC<OpenClawInstallVideoProps> = ({title}) => {
  const frame = useCurrentFrame();
  const watermarkOpacity = interpolate(frame, [0, 20], [0, 0.6], {
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#020617'}}>
      {scenes.map((scene, index) => (
        <Sequence key={scene.title} from={index * SCENE_DURATION} durationInFrames={SCENE_DURATION}>
          <SceneLayout title={index === 0 ? title : scene.title} subtitle={scene.subtitle} bullets={scene.bullets} />
        </Sequence>
      ))}

      <div
        style={{
          position: 'absolute',
          right: 48,
          bottom: 32,
          opacity: watermarkOpacity,
          color: '#94a3b8',
          fontSize: 26,
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        OpenClaw Tutorial • Remotion
      </div>
    </AbsoluteFill>
  );
};
