import type {FC} from 'react';
import {Composition} from 'remotion';
import {OpenClawInstallVideo} from './scenes/OpenClawInstallVideo';

export const RemotionRoot: FC = () => {
  return (
    <>
      <Composition
        id="OpenClawInstall"
        component={OpenClawInstallVideo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: 'OpenClaw 安装教程'
        }}
      />
    </>
  );
};
