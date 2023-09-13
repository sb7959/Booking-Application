import "./featured.css";
import useFetch from "../../hooks/useFetch";
const mumbai = require("./mumbai.jpg");

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:4000//hotels/countByCity?cities=berlin,madrid,london"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featured-item">
            <img src={mumbai} className="featured-image" />
            <div className="featured-titles">
              <h1>mumbai</h1>
              <h1>{data[0]} properties</h1>
            </div>
          </div>
          <div className="featured-item">
            <img src={mumbai} className="featured-image" />
            <div className="featured-titles">
              <h1>Delhi</h1>
              <h1>{data[1]} properties</h1>
            </div>
          </div>
          <div className="featured-item">
            <img src={mumbai} className="featured-image" />
            <div className="featured-titles">
              <h1>Indore</h1>
              <h1>{data[2]} properties</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Featured;
