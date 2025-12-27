import { InteractiveRobotSpline } from './InteractiveRobotSpline'

export default function RobotIntro({ className }: { className?: string }) {
  return (
    <div
      className={`${
        className || ''
      } w-full overflow-hidden rounded-3xl flex flex-col relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900`}
    >
      <div className="w-full h-full relative p-[2%] sm:p-[3%]">
        <InteractiveRobotSpline
          scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  )
}


