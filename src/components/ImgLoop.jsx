/** @format */

function ImgLoop() {
  const rotation = (e) => {
    let target = e.currentTarget
    let copy = target.firstElementChild.cloneNode(true)
    target.appendChild(copy)
    target.removeChild(target.firstElementChild)
    console.log('child width : ', target.firstElementChild.offsetWidth)
  }
  return (
    <>
      <>
        <div className="imgloop">
          <div className="imgloop_title">
            <p className="title">Welcome ABROAD !</p>
            <p className="sub_title">
              Experiences made by students, for students
            </p>
          </div>
          <div className="imgloop_loop" onAnimationIteration={rotation}>
            <img src="src/assets/img.jpg" alt="party0" />
            <img src="src/assets/img.jpg" alt="party1" />
            <img src="src/assets/img.jpg" alt="party2" />
            <img src="src/assets/img.jpg" alt="party3" />
            <img src="src/assets/img.jpg" alt="party4" />
            <img src="src/assets/img.jpg" alt="party5" />
          </div>
        </div>
      </>
    </>
  )
}

export default ImgLoop
