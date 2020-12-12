const mapStateToProps = (state) => ({
  age: state.age,
});

const jeeyoung = {
  age: 28,
  pretty: true,
  isWoman: true,
};

let result = mapStateToProps(jeeyoung);

console.log(result);
