<template>
  <WebCam
    ref="webcam"
    :selectedDeviceIds="deviceIds"
    :audio="false"
    @started="onStarted"
    @stopped="onStopped"
    @error="onError"
    @device-list="onDeviceList"
    @device-change="onDeviceChange"
  />
  <select v-model="cameraDropDown">
    <option>-- Select Device --</option>
    <option
      v-for="device in deviceLists.camera"
      :key="device.deviceId"
      :value="device.deviceId">
      {{ device.label }}</option>
  </select>
  <select v-model="audioDropDown">
    <option>-- Select Device --</option>
    <option
      v-for="device in deviceLists.audio"
      :key="device.deviceId"
      :value="device.deviceId">
      {{ device.label }}</option>
  </select>
</template>

<script lang="ts">
import WebCam from './WebCam.vue';

export default {
  name: "SelectCam",
  components: {
    WebCam
  },
  data() {
    return {
      cameraDropDown: "",
      audioDropDown: "",
      deviceIds: { camera: "", audio: "" },
      deviceLists: { camera: [] as MediaDeviceInfo[], audio: [] as MediaDeviceInfo[] },
    };
  },
  watch: {
    cameraDropDown: function(newValue) {
      this.deviceIds.camera = newValue;
    },
    audioDropDown: function(newValue) {
      this.deviceIds.audio = newValue;
    },
    deviceLists: {
      handler: function() {
        // Once we have a list select the first one
        if (this.deviceLists.camera.length > 0) {
          this.cameraDropDown = this.deviceLists.camera[0].deviceId;
          this.deviceIds.camera = this.cameraDropDown;
        }
        if (this.deviceLists.audio.length > 0) {
          this.audioDropDown = this.deviceLists.audio[0].deviceId;
          this.deviceIds.audio = this.audioDropDown;
        }
      },
      deep: true
    },
  },
  methods: {
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },

    onStarted(stream: MediaStream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream: MediaStream) {
      console.log("On Stopped Event", stream);
    },
    onError(error: any) {
      console.log("On Error Event", error);
    },
    onDeviceList(deviceList: any) {
      this.deviceLists.camera = deviceList.camera;
      this.deviceLists.audio = deviceList.audio;
      // console.log("On Cameras Event", cameras);
    },
    onDeviceChange(deviceIds: any) {
      this.deviceIds.camera = deviceIds.camera;
      this.cameraDropDown = deviceIds.camera;
      this.deviceIds.audio = deviceIds.audio;
      this.audioDropDown = deviceIds.audio
      console.log("On Device Change Event", deviceIds.camera, deviceIds.audio);
    }
  }
};
</script>