<template>
  <video
    autoplay
    ref="video"
    :width="width"
    :height="height"
  />
</template>

<script lang="ts">
export default {
  name: "WebCam",
  props: {
    width: {
      type: Number,
      default: 1200
    },
    height: {
      type: Number,
      default: 720
    },
    selectedDeviceIds: {
      type: Object,
      default: () => ({
        camera: '',
        audio: ''
      }) 
    },
    audio: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cameraList: [] as MediaDeviceInfo[],
      audioList: [] as MediaDeviceInfo[]
    };
  },

  watch: {
    selectedDeviceIds: {
      handler: function(newValue) {
        this.changeDevice(newValue);
      },
      deep: true
    },
  },

  mounted() {
    // An event for detecting new devices. Repopulate devices.
    navigator.mediaDevices.ondevicechange = (event) => {
      this.populateDevices();
    };
    this.setupMedia();
  },

  beforeUnmount() {
    this.stop();
  },

  methods: {
    /** Start is called from parent, ie SelectCam */
    start() {
      if (this.selectedDeviceIds) {
        this.loadDevices(this.selectedDeviceIds);
      }
    },
    /** Stop is called from parent or on destroy, ie SelectCam */
    stop() {
      if (this.$refs.video !== null && this.$refs.video.srcObject) {
        let stream = this.$refs.video.srcObject;
        stream.getTracks().forEach(track => { track.stop(); });
        
        this.$emit("stopped", stream);
        this.$refs.video.srcObject = null;
      }
    },
    setupMedia() {
      let constraints = { 
        video: {
          width: { min: this.width },
          height: { min: this.height }
        },
        audio: this.audio
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          //Make sure to stop this MediaStream
          stream.getTracks().forEach(track => { track.stop(); });
        })
        .catch(error => this.$emit("error", error));
      this.populateDevices();
    },
    populateDevices() {
      navigator.mediaDevices
        .enumerateDevices()
        .then(deviceInfos => {
          this.cameraList = [];
          this.audioList = [];
          deviceInfos.forEach((deviceInfo) => {
            console.log(deviceInfo);
            if (deviceInfo.kind === "videoinput") {
              this.cameraList.push(deviceInfo);
            }
            if (deviceInfo.kind === "audioinput") {
              this.audioList.push(deviceInfo);
            }
          });
        })
        .then(() => {
          this.$emit("device-list", { camera: this.cameraList, audio: this.audioList });
        })
        .catch(error => this.$emit("not-supported", error));
    },
    /** Called when ever the camera/audio deviceId changes, ie. the parent component updates the prop */
    changeDevice(deviceIds: Object) {
      // if (!this.audioList.find(info => info.deviceId === cameraDeviceId)) { return; }
      this.stop();
      this.loadDevices(deviceIds);
      this.$emit("device-change", deviceIds);
    },
    /** Load the stream */
    loadSrcStream(stream: MediaStream) {
      this.$refs.video.srcObject = stream;
      // Emit video start/live event
      this.$refs.video.onloadedmetadata = () => {
        this.$emit("video-live", stream);
      };

      this.$emit("started", stream);
    },
    loadDevices(deviceIds: any) {
      let audio = deviceIds.audio ? deviceIds.audio : this.audio;
      const constraints = { 
        video: {
          deviceId: { exact: deviceIds.camera },
          width: { min: this.width },
          height: { min: this.height }
        },
        audio: audio
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => this.loadSrcStream(stream))
        .catch(error => this.$emit("error", error));
    },
  }
};
</script>