import axios from "axios";
import UltimateConfig from "react-native-ultimate-config";
import { useAppValue, useResetAppState } from "../Recoil/appAtom";
import { removeFromLocal, storeToLocal } from "../Utils/LocalStorage";
import SnackbarHandler from "../Utils/SnackbarHandler";
//Developent URL Details
const rootApi = UltimateConfig.API_URL;
//const rootApi = "https://rehapi.appstudiointernal.ca/"

export default function useApiServices() {
  const appValue = useAppValue();
  const { token } = appValue;
  const resetAppState = useResetAppState();

  const _logout = async (message) => {
    SnackbarHandler.errorToast("Message", message);
    try {
      await storeToLocal("user", JSON.stringify({}));
      await storeToLocal("token", "");
      await removeFromLocal("token");
    } catch (error) {
      console.log(error);
    }
    resetAppState();
  };

  const ApiPostMethod = async (url, body) => {
    const URL = `${rootApi}${url}`;
    console.log("URL=>  " + URL);
    try {
      const res = await fetch(
        URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(body),
        },
        console.log("token=>  " + appValue.token),
        console.log(`${url} body parameters =>` + JSON.stringify(body))
      );
      const data = await res.json();
      console.log(url + "  response ====> ", data);
      if (data.statusCode === 402 && url !== "user/signIn") {
        _logout(data.message);
        return data;
      } else {
        return data;
      }
    } catch (err) {
      console.log("err" + JSON.stringify(err));
      return err;
    }
  };
  const ApiPatchMethod = async (url, body, tok) => {
    const URL = `${rootApi}${url}`;
    console.log("URL=>  " + URL);

    try {
      const res = await fetch(
        URL,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(body),
        },
        console.log(`${url} body parameters =>`, body)
      );
      const data = await res.json();
      console.log(url + "  response ====> ", data);
      if (data.statusCode === 402 || data.statusCode == 401) {
        _logout(data.message);
        return data;
      } else {
        return data;
      }
    } catch (err) {
      console.log("err" + JSON.stringify(err));
      return err;
    }
  };
  const ApiFormDataMethod = async (url, body) => {
    const URL = `${rootApi}${url}`;
    console.log("URL=>  " + URL);
    console.log("body parameters =>" + JSON.stringify(body));
    try {
      const res = await fetch(
        URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
          body: body,
        },
        console.log(url + " body parameters =>", body)
      );
      const data = await res.json();
      console.log(url + "  response ====> ", data);
      if (data.statusCode === 402 || data.statusCode == 401) {
        _logout(data.message);
        return data;
      } else {
        return data;
      }
    } catch (err) {
      console.log("err" + JSON.stringify(err));
      return "error";
    }
  };

  const ApiBasicFormDataMethod = async (url, body) => {
    const URL = `${rootApi}${url}`;
    console.log("URL=>  " + URL);
    console.log("body parameters =>" + JSON.stringify(body));
    // try {
    //   const res = await axios({
    //     method: "post",
    //     url: URL,
    //     data: body,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   const data = await res.json();
    //   console.log(url + "  response ====> ", data);
    //   return data;
    // } catch (err) {
    //   console.log("err" + JSON.stringify(err));
    //   return err;
    // }

    try {
      const res = await fetch(
        URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
          body: body,
          redirect: "follow",
        },
        console.log(url + " body parameters =>", body)
      );
      const data = await res.json();
      console.log(url + "  response ====> ", data);
      if (data.statusCode === 402 || data.statusCode == 401) {
        _logout(data.message);
        return data;
      } else {
        return data;
      }
    } catch (err) {
      console.log("err" + JSON.stringify(err));
      return "error";
    }

    // var requestOptions = {
    //   method: "POST",
    //   body: body,
    //   redirect: "follow",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    // fetch(URL, requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
  };

  const ApiBasicAuthMethod = async (url, body) => {
    const URL = `${rootApi}${url}`;
    console.log("URL=>  " + URL);
    try {
      const res = await fetch(
        URL,
        {
          method: "POST",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
        console.log(url + " body parameters =>" + JSON.stringify(body))
      );
      const data = await res.json();
      console.log(url + "  response ====> ", data);
      if (data.statusCode === 402 || data.statusCode == 401) {
        _logout(data.message);
        return data;
      } else {
        return data;
      }
    } catch (err) {
      console.log("err" + JSON.stringify(err));
      return "error";
    }
  };

  //** Api Get method */
  const ApiGetMethod = async (url) => {
    const URL = `${rootApi}${url}`;
    console.log("ApiGetMethod token=>  ", token);
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (data.statusCode === 402 || data.statusCode == 401) {
      _logout(data.message);
      return data;
    } else {
      return data;
    }
  };

  

  return {
    ApiPostMethod,
    ApiPatchMethod,
    ApiFormDataMethod,
    ApiBasicAuthMethod,
    ApiBasicFormDataMethod,
    ApiGetMethod,
  };
}
