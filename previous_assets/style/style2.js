import { StyleSheet } from 'react-native';

const PRIMARY_COLOR = '#28558E';
const WHITE_COLOR = 'white';
const BLACK_COLOR = 'black';
const GREY_COLOR = '#808080';

var styles = StyleSheet.create({
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
  container: {
    marginHorizontal:15,
    // borderWidth:1,
    // borderColor:'red',
  },
  searchInput: {
    
  },
  loginTopContainer:{
    height:300,
    backgroundColor:PRIMARY_COLOR,
  },
  loginBottomContainer:{
    flex:1,
  },
  loginSearchIconWrapper: {
    paddingVertical: 25,
    alignItems:'center',
    justifyContent:'center',
  },
  loginFooter: {
    paddingTop:150,
  },
  loginCardContainer: {
    position: 'absolute',
    width:'100%',
    top: 110,
    alignItems:'center',
    justifyContent:'center',
    zIndex:1,
  },
  loginCheckbox: {
    borderColor:'#ccc',
    borderWidth:1,
  },
  loginCard: {
    position:'relative',
    width:'90%',
    borderRadius:10,
    alignItems:'center',
  },
  loginCardWraper: {
    paddingRight: 15,
  },
  loginTextWrapper: {
    borderBottomWidth:1.5,
    borderBottomColor: PRIMARY_COLOR,
    alignItems:'center',
    width:60,
    marginVertical: 20,
    paddingBottom:2,
  },
  wid100: {
    width: '100%',
  },
  center:{
    alignItems:'center',
  },
  row: {
    flexDirection:'row',
  },
  loginText: {
    fontSize:16,
    color:BLACK_COLOR,
  },
  font12: {
    fontSize:12,
  },
  font14: {
    fontSize:14,
    paddingLeft:0,
  },
  font15: {
    fontSize:14,
    paddingLeft:0
  },
  font16: {
    fontSize:16,
  },
  rememberAndForgotWrapper: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:25,
    marginBottom:5,
  },
  mtop15:{marginTop:15},
  greyColor:{
    color:GREY_COLOR,
  },
  loginButtonWrapper: {

  },
  textCenter: {
    textAlign:'center',
    
  },
  loginButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius:25,
    paddingHorizontal:30,
    marginVertical: 20,
    height:45,
    backgroundColor:'black'
  },
  formItem: {
    borderColor: '#FFF',
    borderWidth:0,
  },
  modelButton: {
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal:10,
    marginVertical: 20,
    width:120,
    borderRadius:6,
    justifyContent:'center',
  },
  btnSubmit: {
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal:10,
    marginVertical: 20,
    minWidth:200,
    justifyContent:'center',
    
  },
  btnNext: {
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal:10,
    marginVertical: 20,
    minWidth:130,
    justifyContent:'center',
  },
  orWrapper: {
    marginVertical:20,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  orLine: {
    backgroundColor:PRIMARY_COLOR,
    height:1,
    width:'40%',
  },
  orTextContainer: {
    marginHorizontal: 5,
  },
  loginWithStyle: {
    textAlign:'center',
    color: PRIMARY_COLOR,
    fontWeight: "bold",
  },
  socialWrapper: {
    flexDirection:'row',
    alignItems:'center',
    marginVertical:15,
    justifyContent:'center',
  },
  loginSocialImage: {
    marginHorizontal: 5,
    
  },
  primaryColor: {
    color: PRIMARY_COLOR,
  },
  newUserWrapper: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold'
  },
  loginContainerStyle: {paddingTop:0, marginRight:3, paddingRight:0, paddingLeft:3,marginTop:3},

  //Register page style
  registerFormContainer: {
    paddingLeft:10,
    paddingBottom:20,
    paddingRight:30,
    overflow:'hidden',
  },
  registerImageContainer: {
    alignItems:'center',
    marginVertical:20,
  },
  twoRow: {
    flexDirection: 'row',
    flex:1,
    justifyContent:'space-between'
  },
  sectionRow:{
    flexDirection:'row',
  },
  threeRow: {
    flex:1,
  },  
  sectionColumn: {
    flex:1,
    marginHorizontal:10,
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    
  },
  sectionBorder: {
    margin:10,
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    paddingBottom:10,
  },  
  borderNone: {
    borderWidth:0,
    borderColor:'#FFF'
  },
  thriceRow: {
    width:'29%'
  },
  halfRow: {
    width:"46%",
  },
  registerOtherComponents:{
    paddingLeft:10,
    //paddingTop:15,
  },
  registerOtherComponentsText:{
    color: GREY_COLOR,
    fontWeight:"500",
    fontSize:14,
  },
  errorContainer: {
    // backgroundColor:'#F74646',
    margin:10,
    borderRadius:2,
  },
  error:{
    color: 'red',
    paddingHorizontal:10,
    paddingVertical:3,
  },
  white: {
    color: WHITE_COLOR
  }, 
  //Landing page Style
  homeContainer:{
    flex:1
  },
  homeLogoWrapper: {
    alignItems:'center',
    height:'20%',
    justifyContent:'center',
    flex:1,
  },
  homeMiddleWrapper: {
    flex:2,
    justifyContent:'center',
  },
  homeBottomWrapper: {
    justifyContent:'space-between',
    flexDirection:'row',
    
  },
  homeBlueWrapper: {
    backgroundColor: PRIMARY_COLOR,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical: 12,

  },
  homeAreText: {
    color: WHITE_COLOR,
    fontSize:23,
    fontWeight: 'bold',
  },
  
  bottomRoleContainer: {
    backgroundColor: PRIMARY_COLOR,
    alignItems:'center',
    width: '32%',
    height: 130,
  },
  bottomText: {
    color: WHITE_COLOR,
    textAlign:'center',
  },
  bottomImage: {
    position: 'relative',
    bottom: 28,
    width:60,
    height:60,
  },

  // Real Estate pages
  advertisementSpace: {
    height:45,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#43DEAE',
    marginBottom:20,
  },
  inspectionRequestFormContainer: {
    borderColor:'red',
    borderWidth:1,
    overflow:'hidden',
    margin:10,
  },
  dateInput:{
    alignItems: 'flex-start',
    paddingLeft:40,
    borderWidth:0,
    // borderBottomColor:"#333",
    // borderBottomWidth:1,
  },
  // dateInputs:{
  //   alignItems: 'flex-start',
  //   paddingLeft:40,
  //   borderWidth:0,
  //   // borderBottomColor:"#333",
  //   // borderBottomWidth:1,
  // },
  dateText:{
    // borderBottomColor:"#333",
    // borderBottomWidth:1
  },
  dateIcon: {
    position:'absolute',
    left:"10%",
    
  },
  inputError:{borderBottomColor:'red',borderBottomWidth:2,},
  heading: {
    color: PRIMARY_COLOR,
    fontWeight:'bold',
    margin: 10,
    fontSize:18,
  },
  pic: {
    borderRadius: 40,
    width: 70,
    height: 70,
    marginTop: '3%',
    marginLeft: '5%',
},
  heading2: {
    color: PRIMARY_COLOR,
    fontWeight:'bold',
    fontSize:18,
    marginBottom:15
  },
  forgotPasswordContainer: {
    padding:10,
    flex:1,
  },
  otpModel: {
    justifyContent:'center'
  },
  otpmsg: {
    fontSize: 17,
    textAlign:'center',
    marginBottom:20,
  },
  border:{
    borderBottomColor:'#ccc',borderBottomWidth:1,
    marginHorizontal:10,
  },
  border2:{
    borderBottomColor:'#ccc',borderBottomWidth:1,
    marginVertical:10,
  },
  slide: {
    // borderColor:'red',
    // borderWidth:2,
  },
  carouselWrapper:{
    // borderColor:'blue',
    // borderWidth:2,
    // flex:1,
  },
  flatListItem: {
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    paddingVertical:10,
    paddingLeft:10,
  },
  flatListItemTextRow: {
    marginLeft:10,
    flex:1,
  },
  matrixRow: {
    
    borderWidth:2,
    flex:1,
    justifyContent:'space-between'
  },
  sectionColumnMatrix:{
    flex:1,
  },
  matrixInput1: {
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    width:60,
    textAlign:'center',
    paddingBottom:12,
  },
  matrixNumber:{
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:15,
    
  },
  matrixInput2:{
    borderBottomWidth:3,
    borderBottomColor:'#ccc'
  },
  sectionMatrixRow: {
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:5,
    marginVertical:10,
  },
  dash:{backgroundColor:'#ccc',width:15,height:2},
  addMore:{
    color:PRIMARY_COLOR,
    textAlign:'right'
  },
  borderBottom: {borderBottomWidth:1,borderBottomColor:'#ccc', marginVertical:15},
  capitalize: {textTransform:'capitalize'},
  summarySelectedIspector: {
    borderBottomWidth:1,
    borderColor:'#ccc',
    flexDirection:'row',
    justifyContent:'center',
    paddingVertical:15,
    paddingHorizontal:10,
  },
  overlayContainer: {
    justifyContent:'center',
    alignItems:'center',
  },
  borderIcon:{
    padding:12,
    borderRadius: 1, 
    borderWidth: 1, 
    borderColor: '#ccc',
    justifyContent:'center',
    alignContent:'center'
  },
  nameTxt:{color:'#525152', fontWeight:'bold', fontSize:13},
  nameTxt2:{fontSize:12},
  normalButton: {
    backgroundColor:PRIMARY_COLOR
  },
  containerInspectorList: {
    width:'100%'
  },
  buttonText: {
    textTransform:'capitalize',
    fontSize:16,
  },
  lineSpacing: {
    marginVertical:15
  },
  nextButtonWrapper:{alignItems:'flex-end', marginTop:15},
  header:{backgroundColor: "#1b244d", elevation: 0, shadowOpacity: 1 },
  enabledgps:{marginLeft: 5, fontSize: 15, textAlign: 'center', marginTop: 10, marginBottom: 10}
});

module.exports = styles;