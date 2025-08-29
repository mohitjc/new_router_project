import { toast } from "react-toastify";
import environment from "~/envirnment.ts"

const isTranslatePage = () => {
  let value = false;
  let url = window.location.href;
  if (url.includes("translation")) value = true;
  return value;
};

const generatekeysArr = (arr, key = "typeofresult") => {
  let keys = {};
  if (!arr) return { keys, arr: [] };
  arr.map((itm) => {
    if (keys[itm[key]]) {
      keys[itm[key]].push(itm);
    } else {
      keys[itm[key]] = [itm];
    }
  });
  return {
    keys,
    arr: Object.keys(keys).map((itm) => {
      return { key: itm, value: keys[itm] };
    }),
  };
};

const userImg = (img, defaultImg = '/assets/img/person.jpg') => {
  let value = defaultImg;
  // if (img) value = environment.api + 'img/' + img
  if (img?.includes("https")) return img;
  if (img) value = `${environment.sasurl}/${environment.container}/${img}`;
  return value;
};

const noImg = (img, modal = "blogs", defaultImg = '/assets/img/placeholder.png') => {
  let value = defaultImg;
  if (img?.includes("https")) return img;
  if (img) value = `${environment.sasurl}/${environment.container}/${img}`;
  return value;
};

const getPrams = (p) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(p);
};

const isNumber = (e) => {
  let key = e.target;
  let maxlength = key.maxLength ? key.maxLength : 0;

  let max = Number(key.max ? key.max : key.value);
  if (Number(key.value) > max) key.value = max;

  // let min = key.min;
  // if (min && Number(key.value)<Number(min)) key.value = min;


  if (maxlength > 0) {
    if (key.value.length > maxlength) key.value = key.value.slice(0, maxlength);
  }

  key.value = key.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");

  return key.value;
};

const isRatio = (e) => {
  let key = e.target;
  let maxlength = key.maxLength ? key.maxLength : 1;

  let max = Number(key.max ? key.max : key.value);
  if (Number(key.value) > max) key.value = max;

  // let min = key.min;
  // if (min && Number(key.value)<Number(min)) key.value = min;

  if (key.value.length > maxlength) key.value = key.value.slice(0, maxlength);
  key.value = key.value.replace(/[^0-9.>]/g, "").replace(/(\..*?)\..*/g, "$1");

  return key.value;
};

const find = (arr, value, key = "key") => {
  let ext = arr?.find((itm) => itm[key] == value);
  return ext;
};

/* ###################### Form Methods #########################  */

// get Single field error
const getError = (key, fvalue, formValidation) => {
  let ext = find(formValidation, key);
  let res = matchError(ext, fvalue);
  return res;
};

const emailRequiredFor = (role) => {
  let value = false;
  if (
    role == "Clinic Admin" ||
    role == "Counsellor" ||
    role == "Owner" ||
    role == "admin"
  )
    value = true;
  return value;
};

const validateUsername = (val) => {
  return /^(?=[a-zA-Z0-9._-]{8,20}$)(?!.*[_.-]{2})[^_.-].*[^_.-]$/.test(val);
};

const dialMatch = (val) => {
  let value = false;
  value = val.match(/^(?=.*[0-9])(?=.*[+])[0-9+]{2,5}$/);
  return value;
};
// const emailvalidation = (val) => {
//   if (
//     val.match(
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     )
//   ) {
//     return true;
//   }
//   // if(!val.includes(".")){
//   //     return false
//   // }
//   return false;
// };

const emailvalidation = (val) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(val);
};

const urlValidation = (val) => {
  if (
    val.match(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    )
  ) {
    return true;
  }
  // if(!val.includes(".")){
  //     return false
  // }
  return false;
};
// match errors for fields
const matchError = (ext, fValue) => {
  let invalid = false;
  let kValue = fValue[ext.key];
  let value = {
    minLength: false,
    maxLength: false,
    confirmMatch: false,
    required: false,
  };
  let message = "";
  if (ext.required) {
    if (!kValue || (!kValue.length && typeof kValue != "object")) {
      invalid = true;
      message = ext?.message || "This is Required";
    }
  }
  if (ext.minLength && kValue) {
    if (kValue.length < ext.minLength) {
      value.minLength = true;
      message = ext?.message || `Min Length is ${ext.minLength}`;
    }
  }
  if (ext.email && kValue) {
    if (!emailvalidation(kValue)) {
      value.email = true;
      message = ext?.message || `Email is invalid`;
    }
  }
  if (ext.maxLength && kValue) {
    if (kValue.length > ext.maxLength) {
      value.maxLength = true;
      message = ext?.message || `Max Length is ${ext.maxLength}`;
    }
  }
  if (ext.dialCode && kValue) {
    if (dialMatch(kValue)) {
      kValue.indexOf("+");
      if (kValue.indexOf("+") != 0) {
        value.dialCode = true;
        message = ext?.message || `DialCode is Invalid`;
      }
    } else {
      value.dialCode = true;
      message = ext?.message || `DialCode is Invalid`;
    }
  }

  if (ext.username && kValue) {
    if (!validateUsername(kValue)) value.username = true;
  }

  if (ext.confirmMatch && kValue) {
    if (fValue[ext.confirmMatch[0]] != fValue[ext.confirmMatch[1]]) {
      value.confirmMatch = true;
      message = ext?.message || `Confirm Password is not matched`;
    }
  }

  let vArr = Object.keys(value);
  vArr.map((itm) => {
    if (value[itm]) invalid = true;
  });

  let res = { invalid: invalid, err: value, message };
  return res;
};

// get form error (All Fields)
const getFormError = (formValidation, fvalue) => {
  let invalid = false;
  formValidation.map((ext) => {
    if (matchError(ext, fvalue).invalid) {
      console.log("getFormError", ext);
      invalid = true;
    }
  });

  return invalid;
};

/* ###################### Form Methods end #########################  */

const route = (route) => {
  localStorage.setItem("route", route);
  let el = document.getElementById("routerDiv");
  setTimeout(() => {
    if (el) el.click();
  });
};

const flagIcon = (icon = "", width = 50) => {
  const imageErr = (e) => {
    e.target.src = "/assets/img/placeholder.png";
  };
  return (
    <>
      <img
        src={`https://flagsapi.com/${icon?.toUpperCase()}/flat/64.png`}
        width={width}
        onError={imageErr}
      />
    </>
  );
};

function containsSpaceonly(text) {
  return /\s/.test(text);
}

const msToTime = (milliseconds, ago = true) => {
  //get hours from milliseconds
  var hours = milliseconds / (1000 * 60 * 60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours;
  //get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteminutes = Math.floor(minutes);
  var m = absoluteminutes;

  //get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteminutes) * 60;
  var absoluteseconds = Math.floor(seconds);
  var s = absoluteseconds;

  var time = "";
  if (h > 0) {
    time += `${h}h`;
  }
  if (m > 0) {
    time += ` ${m}m`;
  }

  if (ago) {
    if (h == 0 && m == 0) {
      time += `a few seconds`;
    }
    time += " ago";
  }
  return time;
};

function createAvatar(name, status = null) {
  const avatar = document.createElement('div');

  const initial = name?.charAt(0).toUpperCase() || '?';

  // Determine background color class
  let bgClass = 'bg-gray-500';
  if (status === 'Groove group') {
    bgClass = 'bg-orange-500';
  } else if (status === 'Craft club') {
    bgClass = 'bg-blue-500';
  }

  // Add Tailwind classes
  avatar.className = `${bgClass} text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg select-none`;
  avatar.textContent = initial;

  return `${avatar}`;
}


const showError = (msg) => {
  toast.error(msg);
}
const LostInProcessShower = (packData) => {
  if (packData?.actualUnits) {
    return packData?.targetUnits - packData?.actualUnits
  } else {
    return "0.00"
  }
}

const PublishOptions=[{ id: 'public', name: 'Public' }, { id: 'groove', name: 'Groove Guide' }, { id: 'shroom', name: 'Shroom Groove' }, { id: 'craft', name: 'Craft Club' },{ id: 'grill', name: 'Groove Grill' },]

/*EVA methods start */
 const personalityToneMap = {
  casual:
    "Speak in a friendly, relaxed tone. Use simple language, contractions, and emojis if appropriate. Feel approachable and easygoing.",
  humorous:
    "Speak with light humor and playfulness. Use witty remarks or puns where appropriate, but remain helpful and clear. Don't overdo jokes or sound unprofessional.",
  direct:
    "Speak concisely and to the point. Avoid small talk and extra words. Focus on efficiency, clarity, and fast resolution.",
  formal:
    "Use professional and respectful language. Avoid contractions, slang, or informal expressions. Maintain a polished and courteous tone at all times.",
  persuasive:
    "Speak confidently and with a goal-oriented mindset. Highlight benefits clearly and encourage action with positive, compelling language. Be convincing but not pushy.",
  friendly:
    "Speak warmly and with genuine interest. Use kind, supportive language that makes the user feel comfortable and valued. Maintain an upbeat and approachable tone.",
};

/*EVA methods end */


const methodModel = {
  userImg,
  PublishOptions,
  route,
  flagIcon,
  isNumber,
  isRatio,
  find,
  getError,
  getFormError,
  getPrams,
  emailRequiredFor,
  emailvalidation,
  noImg,
  isTranslatePage,
  generatekeysArr,
  containsSpaceonly,
  msToTime,
  urlValidation,
  showError,
  createAvatar,
  LostInProcessShower,
  /*EVA methods start */
  personalityToneMap
  /*EVA methods end */

};
export default methodModel;
