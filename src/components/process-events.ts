"use client";
export type ProcessRecord={id:string;title:string;done?:boolean;archivedAt?:string|null};
export type ProcessEvent={type:"add"|"replace"|"update"|"remove";process?:ProcessRecord;id?:string;replaceId?:string};
const eventName="momentum-process-change"; const channelName="momentum-process-channel";
export function emitProcessEvent(event:ProcessEvent){window.dispatchEvent(new CustomEvent<ProcessEvent>(eventName,{detail:event}));const channel=new BroadcastChannel(channelName);channel.postMessage(event);channel.close()}
export function subscribeProcessEvents(callback:(event:ProcessEvent)=>void){const local=(event:Event)=>callback((event as CustomEvent<ProcessEvent>).detail);window.addEventListener(eventName,local);const channel=new BroadcastChannel(channelName);channel.onmessage=(event:MessageEvent<ProcessEvent>)=>callback(event.data);return()=>{window.removeEventListener(eventName,local);channel.close()}}
