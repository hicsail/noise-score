import { Platform } from 'react-native';

export const NOISE_SOURCES = [

  {val: 'airplane', text:'airplane', icon:'airplane'},
  {val: 'alarm', text:'alarm', icon:'alarm-light'},
  {val: 'car music', text:'car music', icon:'car-wash'},
  {val: 'construction', text:'construction', icon:'wrench'},

  {val: 'delivery', text:'delivery', icon:'truck-delivery'},
  {val: 'dog', text:'dog', icon:'dog-side'},
  {val: 'fireworks', text:'fireworks', icon:'star'},
  {val: 'footsteps', text:'footsteps', icon:'shoe-formal'},
  {val: 'horn', text:'horn', icon:'bullhorn'},
  {val: 'hvac', text:'hvac', icon:'air-conditioner'},

  {val: 'leaf blower', text:'leaf blower', icon:'leaf'},
  {val: 'music', text:'music', icon:'music'},
  {val: 'neighbor', text:'neighbor', icon:'human-male'},
  {val: 'party', text:'party', icon:'glass-cocktail'},
  {val: 'pickup', text:'pickup', icon:'truck'},

  {val: 'quiet', text:'quiet', icon:'volume-low'},
  {val: 'restaurant', text:'restaurant', icon:'silverware-fork-knife'},
  {val: 'traffic', text:'traffic', icon:'car'},
  {val: 'trains', text:'trains', icon:'train'},
  {val: 'trash', text:'trash', icon:'delete'},

  {val: 'voices', text:'voices', icon:'voice'},
  {val: 'other', text:'other', icon:'checkbox-blank-circle-outline'}

];

export const IP_ADDRESS = (Platform.OS === 'ios') ? 'localhost:9000' : '10.0.2.2:9000';



