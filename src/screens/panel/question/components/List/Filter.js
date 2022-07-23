// import {
//   faAngleDoubleDown,
//   faAngleDoubleUp,
// } from '@fortawesome/free-solid-svg-icons';
// import React, {useState} from 'react';
// import {View} from 'react-native';
// import {PhoneView} from '../../../../../styles/Common';
// import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
// function Filter(props) {
//   const [showProSearch, setShowProSearch] = useState(false);
//   const [wantedIcon, setWantedIcon] = useState(faAngleDoubleDown);

//   const toggleShowProSearch = () => {
//     if (showProSearch) setWantedIcon(faAngleDoubleDown);
//     else setWantedIcon(faAngleDoubleUp);
//     setShowProSearch(!showProSearch);
//   };

//   return (
//     <View style={{zIndex: 'unset'}}>
//       <PhoneView>
//         <JustBottomBorderSelect
//           isHalf={true}
//           setter={setStatus}
//           values={statusKeyVals}
//           value={statusKeyVals.find(elem => elem.id === status)}
//           placeholder={translator.status}
//         />
//         <JustBottomBorderSelect
//           isHalf={true}
//           setter={setPriority}
//           values={priorityKeyVals}
//           value={priorityKeyVals.find(elem => elem.id === priority)}
//           placeholder={translator.priority}
//         />

//         <CommonButton
//           onPress={() =>
//             filter(
//               props,
//               priority,
//               section,
//               startWith,
//               status,
//               searchArchive,
//               sendDateSolar,
//               sendDateSolarEndLimit,
//               answerDateSolar,
//               answerDateSolarEndLimit,
//             )
//           }
//           isHalf={true}
//           title={commonTranslator.show}
//           style={{alignSelf: 'flex-start'}}
//         />
//       </PhoneView>
//       <PhoneView>
//         <SimpleText
//           onPress={() => toggleShowProSearch()}
//           style={{
//             paddingTop: 15,
//             paddingrRight: 15,
//             paddingBottom: 15,
//             cursor: 'pointer',
//             color: vars.DARK_BLUE,
//           }}
//           text={commonTranslator.advancedSearch}
//         />
//         <View
//           style={{
//             width: 20,
//             height: 20,
//             alignSelf: 'center',
//           }}>
//           <SimpleFontIcon
//             style={{
//               color: vars.DARK_BLUE,
//             }}
//             icon={wantedIcon}
//           />
//         </View>
//       </PhoneView>
//       {showProSearch && (
//         <View style={{zIndex: 'unset'}}>
//           <PhoneView style={{zIndex: 'unset'}}>
//             <JustBottomBorderDatePicker
//               placeholder={translator.dateStartRequest}
//               setter={setSendDateSolar}
//               value={sendDateSolar}
//               isHalf={true}
//             />
//             <JustBottomBorderDatePicker
//               placeholder={translator.dateEndRequest}
//               setter={setSendDateSolarEndLimit}
//               value={sendDateSolarEndLimit}
//               isHalf={true}
//             />
//             <JustBottomBorderSelect
//               isHalf={true}
//               setter={setStartWith}
//               values={startWithVals}
//               value={startWithVals.find(elem => elem.id === startWith)}
//               placeholder={translator.startWith}
//             />
//           </PhoneView>
//           <PhoneView style={{marginTop: 10, zIndex: 'unset'}}>
//             <JustBottomBorderDatePicker
//               placeholder={translator.lastStartUpdate}
//               subText={translator.lastStartUpdate}
//               setter={setAnswerDateSolar}
//               value={answerDateSolar}
//               isHalf={true}
//             />
//             <JustBottomBorderDatePicker
//               placeholder={translator.lastEndUpdate}
//               setter={setAnswerDateSolarEndLimit}
//               value={answerDateSolarEndLimit}
//               isHalf={true}
//             />
//             <View style={{marginTop: 10}}>
//               <RadioButtonYesOrNo
//                 label={translator.searchArchive}
//                 selected={searchArchive}
//                 setSelected={setSearchArchive}
//               />
//             </View>
//           </PhoneView>
//         </View>
//       )}
//     </View>
//   );
// }

// export default Filter;
