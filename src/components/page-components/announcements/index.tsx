import * as React from 'react';
import styled from '@/styled/index';
import { IAnnouncement } from '@/services/helpers/backend-models';
import { Row, Col } from 'react-bootstrap';

const Slider = React.lazy(() => import('react-slick'));
/* AnnouncementComponent Helpers */
interface AnnouncementComponentProps {
  announcements?: IAnnouncement[];
}

const SliderImg = styled.img`
  height: 600px;
  width: 100%;
`;

/* AnnouncementComponent Component  */
function AnnouncementComponent(props: React.PropsWithChildren<AnnouncementComponentProps>) {
  /* AnnouncementComponent Variables */
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  /* AnnouncementComponent Callbacks */

  /* AnnouncementComponent Lifecycle  */

  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Row>
        <Col lg={12} md={12} sm={12} xl={12} xs={12} className="border-bottom p-2 mb-2">
          <h3>Duyurular</h3>
        </Col>
        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
          <Slider {...settings}>
            {props.announcements &&
              props.announcements.map(item => (
                <div key={item.id}>
                  <h3>{item.title}</h3>
                  <p>{item.message}</p>
                  <SliderImg src={item.fileUrl} />
                </div>
              ))}
          </Slider>
        </Col>
      </Row>
    </React.Suspense>
  );
}
const PureAnnouncementComponent = React.memo(AnnouncementComponent);

export { PureAnnouncementComponent as AnnouncementComponent };
