import React, { ComponentProps, Fragment } from "react";
import { TextInput, HelperText } from "react-native-paper";
import { Controller } from "react-hook-form";
import Toggle from "./Toggle";
import InputComponent from "../CustomComponents/InputComponent";

function FormInput({ config, control, errors, rules }) {
  const { name, textInputProps, customProps } = config;

  return (
    <Fragment>
      <Controller
        render={({ onChange, onBlur, value }) => {
          return (
            <InputComponent
              textInputProps={{
                ...textInputProps,
                onChangeText: onChange,
                onBlur,
                value,
              }}
              customProps={{ ...customProps, error: errors[name] }}
            />
          );
        }}
        rules={rules}
        control={control}
        name={name}
      />
      <Toggle visible={errors?.[name]}>
        <HelperText type={"error"}>{errors?.[name]?.message}</HelperText>
      </Toggle>
    </Fragment>
  );
}

export default FormInput;
