import React from "react";
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { threedots, deleteIcon } from "../../../Assets/icon";
import Scaler from "../../../Utils/Scaler";
import Menu, {
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

function ViewMoreModal(props) {
  const { data, onDeletePost } = props;
  const [currentPostId, setCurrentPostId] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  console.log("Postcard data => ", data);
  const { user } = useAppValue();
  const { _id } = user;

  return (
    <Menu
      style={{}}
      opened={dialogVisible}
      onBackdropPress={() => setDialogVisible(false)}
      onSelect={() => onDeletePost(currentPostId)}
    >
      <MenuTrigger
        onPress={() => {
          setCurrentPostId(item._id);
          setDialogVisible(true);
        }}
      >
        <Image
          source={threedots}
          style={{ height: Scaler(17), resizeMode: "contain" }}
        />
      </MenuTrigger>
      {/* {currentPostId === item._id ? ( */}
      <MenuOptions
        optionsContainerStyle={{
          width: Scaler(160),
          height: 50,
          paddingHorizontal: 5,
          borderRadius: 10,
        }}
      >
        <MenuOption value={"delete"}>
          <View
            style={{
              flexDirection: "row",
              width: Scaler(155),
              height: Scaler(40),
              borderRadius: 10,
              justifyContent: "flex-start",
              alignItems: "center",
              paddingHorizontal: Scaler(15),
            }}
          >
            <Image source={deleteIcon} />
            <Text style={{ marginLeft: Scaler(15) }}>Delete</Text>
          </View>
        </MenuOption>
      </MenuOptions>
      {/* ) : null} */}
    </Menu>
  );
}

ViewMoreModal.propTypes = {};

export default ViewMoreModal;
