const User = (props) => {
  return <div>Profile</div>;
};

export default User;

export async function getServerSideProps(req) {
  return {
    props: { userId: req.query.userId },
  };
}
