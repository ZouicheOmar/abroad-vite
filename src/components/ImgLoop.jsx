/** @format */

function ImgLoop() {
  const rotation = (e) => {
    let target = e.currentTarget
    let copy = target.firstElementChild.cloneNode(true)
    target.appendChild(copy)
    target.removeChild(target.firstElementChild)
  }
  return (
    <>
      <>
        <div className="imgloop">
          <div className="imgloop_title">
            <p className="title">
              Welcome <span>ABROAD</span>!
            </p>
            <p className="subtitle">
              Experiences made by students, for students
            </p>
          </div>
          <div className="imgloop_loop" onAnimationIteration={rotation}>
            <img src="./carnon.jpg" alt="party0" />
            <img src="./carnon.jpg" alt="party1" />
            <img src="./carnon.jpg" alt="party2" />
            <img src="./carnon.jpg" alt="party3" />
            <img src="./carnon.jpg" alt="party4" />
            <img src="./carnon.jpg" alt="party5" />
          </div>
        </div>
      </>
    </>
  )
}

export default ImgLoop
