import img_userPic from "../../../assets/img_userPic.png";

function DashboardLoged(props) {
  return (
    <div className="DashboarlogedInfo">
      <div className="DashboarduserInfo">
        <img src={img_userPic} alt=""></img>
        <div id="DashboarduserNames">
          <h1>{props.nom}</h1>
          <h1>{props.prenom}</h1>
        </div>
        <h2 id="DashboarduserGroup">{props.groupe}</h2>
      </div>
    </div>
  );
}

export default DashboardLoged;
