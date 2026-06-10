import React from "react";
import { Composition } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Hook } from "./scenes/Hook";
import { Scaffold } from "./scenes/Scaffold";
import { DevServer } from "./scenes/DevServer";
import { TheApp } from "./scenes/TheApp";
import { LiveEdit } from "./scenes/LiveEdit";
import { TwoTiers } from "./scenes/TwoTiers";
import { Widgets } from "./scenes/Widgets";
import { Outro } from "./scenes/Outro";

const SCENES: { Comp: React.FC; frames: number }[] = [
  { Comp: Hook, frames: 75 },
  { Comp: Scaffold, frames: 135 },
  { Comp: DevServer, frames: 90 },
  { Comp: TheApp, frames: 165 },
  { Comp: LiveEdit, frames: 210 },
  { Comp: TwoTiers, frames: 105 },
  { Comp: Widgets, frames: 110 },
  { Comp: Outro, frames: 75 },
];

const TRANSITION = 10;
const TOTAL =
  SCENES.reduce((sum, s) => sum + s.frames, 0) - (SCENES.length - 1) * TRANSITION;

const DemoVideo: React.FC = () => (
  <TransitionSeries>
    {SCENES.flatMap(({ Comp, frames }, i) => [
      ...(i > 0
        ? [
            <TransitionSeries.Transition
              key={`t${i}`}
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION })}
            />,
          ]
        : []),
      <TransitionSeries.Sequence key={i} durationInFrames={frames}>
        <Comp />
      </TransitionSeries.Sequence>,
    ])}
  </TransitionSeries>
);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Demo"
    component={DemoVideo}
    durationInFrames={TOTAL}
    fps={30}
    width={1280}
    height={720}
  />
);
