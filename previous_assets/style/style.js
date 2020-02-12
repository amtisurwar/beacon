const React = require('react-native');

const {
  StyleSheet,
  Dimensions,
  Platform
} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    height: deviceHeight,
    flex: 1,
  },
  header:
  {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0
  },
  logoBack:
  {
    justifyContent: 'center',
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    marginTop: "35%"
  },
  iconImage:
  {
    height: 120,
    width: 80
  },
  inputView:
  {
    paddingLeft: 40,
    marginRight: 40
  },
  orLabel:
  {
    justifyContent: 'center',
    marginTop: "8%",
    marginBottom: "8%",
  },
  rememberAndForgotWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "8%",
    marginBottom: 1
  },
  row: {
    flexDirection: 'row'

  },
  socialRow:{
    marginLeft: "45%", position:'absolute', paddingBottom:"47%"
  },
  signUptext:{
    borderBottomColor: "#fff", borderBottomWidth: 1, color: '#fff', alignSelf: 'center', alignContent: 'center', justifyContent: 'center', marginLeft: 5 
  },
  bottomRow:{
    justifyContent: 'center', marginBottom: 60, marginTop: 60, alignSelf: 'center', alignContent: 'center', justifyContent: 'center', 
  },
  newUser:{
    textAlign: 'center', color: '#333', color: '#fff', alignSelf: 'center', alignContent: 'center', justifyContent: 'center'
  },
  
  font14: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  font15: {
    fontSize: 14,
    marginLeft: 15,
  },
  loginContainerStyle: { paddingTop: 0, marginRight: 3, paddingRight: 0, paddingLeft: 0, marginTop: 3 },
  fb:
  {
    marginRight: 10,
    backgroundColor: '#3a589e',
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 2,
    width: 100
  },
  google:
  {
    marginLeft: 15,
    backgroundColor: '#F44336',
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 2,
    width: 100
  },
  icon: {
    width: 42,
    height: 42,
  },
  icons: {
    width: 22,
    height: 22,
  },
  loginCheckbox: {
    width: 15,
    height: 15,
    borderRadius:5
  },
  forgot:
  {
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    color: 'white'
  },
  imagebackground: {
    // height: deviceHeight,
    flex: 1,
  },

  headingtext: {
    paddingTop: 10,
    fontSize: 16,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  checkboxText: {
    fontWeight: 'normal',
    color: '#37474F',
    fontSize: 16,
  },
  selectedCheckbox: {
    backgroundColor: '#558B2F',
    borderColor: '#37474F',

  },
  unSelectedCheckbox: {
    backgroundColor: 'transparent',
    borderColor: '#37474F',

  },
  checkboxstyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: global.FONT_SIZE,
    marginBottom: global.FONT_SIZE,

  },
  loadingCenter: {
    flex: 1,
    alignSelf: 'center'
  },
  inputfield: {
    padding: 0,
    color: '#333',
    fontSize: 15
  },
  splash: {
    width: '100%',
    height: '100%',
  },
  red: {
    color:'red'
  },  
  imageThumbnail:{
    borderWidth:1,
    width:'100%',
    flex:1,
  },



  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: "15%",
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
};