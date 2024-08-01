type Props = {
  img: string[]
  imgItem: number
}
const CircleBlock = ({ img, imgItem }: Props) => {
  const Circle = []
  for (let i = 1; i <= img.length; i++) {
    Circle.push(i)
  }
  const block = Circle.map((e, i, arr) => {
    return <div className={`bg-dark-900 rounded-full w-[10px] h-[10px]`} key={i} />
  })
  return (
    <div className="w-auto bg-dark-100/50 flex flex-column justify-center gap-3 p-2">{block}</div>
  )
}
export default CircleBlock
