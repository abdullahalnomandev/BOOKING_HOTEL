import { StarFilled } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Typography } from "antd";
import "./ClientReviews.css";

const { Text } = Typography;

const reviews = [
  {
    id: 1,
    name: "John Doe",
    photo:
      "https://img.freepik.com/free-photo/young-man-with-beard-round-glasses_273609-6203.jpg",
    review:
      "Staying here was a dream. The view, the food, and the hospitality were all outstanding!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophia Turner",
    photo:
      "https://www.shutterstock.com/image-photo/happy-handsome-caucasian-man-casual-260nw-2378378987.jpg",
    review:
      "One of the best eco-friendly resorts I've experienced. Will definitely return!",
    rating: 4,
  },
  {
    id: 3,
    name: "Michael Chen",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Absolutely magical place — the snowy scenery was perfect for a winter shoot.",
    rating: 5,
  },
  {
    id: 4,
    name: "Emily Wilson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Incredible staff and cozy rooms. A perfect getaway from the busy city life.",
    rating: 5,
  },
  {
    id: 5,
    name: "Carlos Ramirez",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Loved the eco-friendly concept. It’s rare to find such comfort and sustainability together.",
    rating: 4,
  },
  {
    id: 6,
    name: "Aisha Khan",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    review:
      "Everything was perfect from check-in to check-out. Highly recommend!",
    rating: 5,
  },
];

const ClientReviews = () => {
  return (
    <div className='reviews-section head-content text-center mb-16'>
      <h1 className='text-3xl md:text-4xl font-semibold mb-10'>
        WHAT OUR <span style={{ color: "#fe5d5d" }}>CLIENTS SAY</span>
      </h1>

      <Row gutter={[24, 24]} justify='center'>
        {reviews.map(({ id, name, photo, review, rating }) => (
          <Col xs={24} sm={12} md={8} key={id}>
            <Card className='review-card' bordered={false}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  marginBottom: "16px",
                }}>
                <Avatar src={photo} size={64} />
                <Text strong style={{ fontSize: "18px" }}>
                  {name}
                </Text>
              </div>
              <Text className='review-text block italic text-gray-700'>
                &ldquo;{review}&rdquo;
              </Text>
              <div className='mt-4'>
                {[...Array(rating)].map((_, i) => (
                  <StarFilled
                    key={i}
                    style={{ color: "#fadb14", marginRight: 4 }}
                  />
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ClientReviews;
