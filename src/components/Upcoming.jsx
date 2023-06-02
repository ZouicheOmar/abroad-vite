/** @format */

function Card({src}) {
  return (
    <>
      <div className="card">
        <img src={src} alt="tropisme" className="card_img" />
        <div className="card-describe">
          <p className="card_title">EVENT_NAME</p>
          <p className="card_date">Juin 1st</p>
        </div>
      </div>
    </>
  )
}

function Upcoming() {
  return (
    <>
      <div className="upcoming">
        <p className="title">à ne pas rater</p>
        <div className="body">
          <Card src="./img.jpg" />
          <Card src="./img.jpg" />
          <Card src="./img.jpg" />
          <Card src="./img.jpg" />
          <Card src="./img.jpg" />
        </div>
      </div>
    </>
  )
}

export default Upcoming
