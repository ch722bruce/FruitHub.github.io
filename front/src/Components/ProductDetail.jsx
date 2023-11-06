import { useParams, Link } from "react-router-dom";
import Title from "./Title";
import QuantityBtn from "./QuantityBtn";
import {useState, useEffect} from "react";
import SubscribeBtn from "./SubscribeBtn";

export default function ProductDetail() {
  let params = useParams();
  let [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    fetch(`/api/fruits/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        if(!data) setProductDetail("")
        else setProductDetail(data);
      }).catch(()=>setProductDetail(""));

  }, []);


  return (
    <div>
      {productDetail && (
        <div className="ProductDetail">
          <Title mainTitle={productDetail.name + " Product Detail"} />

          <table width="100%">
            <tbody>
              <tr>
                <td align="right">
                  <img
                    src={productDetail.image_url}
                    alt={productDetail.name}
                    width="400"
                  />
                </td>
                <td width="45%" style={{ padding: "10px" }}>
                  <p>Name: {productDetail.name}</p>
                  <p>Price: {productDetail.price}</p>
                  <p>Description: {productDetail.description}</p>
                  <br />
                  <QuantityBtn productInfo={productDetail} />
                  <SubscribeBtn productInfo={productDetail} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {productDetail==="" && (
        <div className="ProductDetail">
          <Title mainTitle={"Product Not Found"} />
        </div>
      )}
      {productDetail!==null && <Link to="/">
        <div className="backToGoodsListBtn">↩️ Go Back</div>
      </Link>}
    </div>
  );
}
