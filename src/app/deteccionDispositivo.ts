import { Injectable } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";

@Injectable({ providedIn: 'root' })

export class DeteccionDispositivo {
  constructor(private device: DeviceDetectorService){
  }
  isMobile(){
    return this.device.isMobile();
  }
  isTablet(){
    return this.device.isTablet();
  }
  isDesktop(){
    return this.device.isDesktop()
  }
}