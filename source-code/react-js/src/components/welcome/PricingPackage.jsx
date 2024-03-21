import  basicImage  from "../../assets/premium.png";
import   starterImage  from "../../assets/premium.png";
import   premiumImage  from "../../assets/premium.png";
import checkedImage from "../../assets/grey-checked.png";
import arrowImage from "../../assets/left-arrow.png";

export default function PricingPackage({ name }) {
  return (
    <div>
      <h3>
        {name} <img src={getImage(name)} alt={`${name} image`} />
      </h3>
      <ul>
        <li>
          <span>
            <img src={checkedImage} alt="checked image" />
          </span>
          Unlimited Access to Home Club
        </li>
        <li>
          <span>
            <img src={checkedImage} alt="checked image" />
          </span>
          Free Fitness Training
        </li>
        <li>
          <span>
            <img src={checkedImage} alt="checked image" />
          </span>
          Free Training Session With The Club
        </li>
      </ul>
      <p>
        <span>$19</span> /Month
      </p>
      <hr />
      <button>
        <span>Purchase Now</span>
        <img src={arrowImage} alt="arrow image" />
      </button>
    </div>
  );
}

function getImage(name) {
  switch (name) {
    case "BASIC":
      return basicImage;
    case "STARTER":
      return starterImage;
    case "PREMIUM":
      return premiumImage;
    default:
      return null;
  }
}
