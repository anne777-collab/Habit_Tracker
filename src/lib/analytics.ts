export function completionRate(completed:number,total:number){ return total ? Math.round((completed/total)*100) : 0; }
export function currentStreak(days:string[], today=new Date()){ const set=new Set(days); let streak=0; const cursor=new Date(today); while(set.has(cursor.toISOString().slice(0,10))){streak++; cursor.setUTCDate(cursor.getUTCDate()-1);} return streak; }
export function heatLevel(count:number){ return count===0?0:count===1?1:count===2?2:count===3?3:4; }
