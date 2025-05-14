import DeviceDetector from "device-detector-js";

const deviceDetector = new DeviceDetector();

export const detector = (req, res, next) => {
  const userAgent = req.headers["user-agent"] || "";
  const device = deviceDetector.parse(userAgent);

  req.device = {
    client: device?.client.name,
    os: device?.os,
    device_logs: device?.device,
    row_user_agent: userAgent,
  };

  return next();
};
