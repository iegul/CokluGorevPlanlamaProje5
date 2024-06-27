import { Col, Row } from "antd";

import Gorevler from "./Gorevler";

const Yapilacaklar = () => {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Gorevler />
      </Col>
    </Row>
  );
};

export default Yapilacaklar;
