import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  trigger_alert: number | undefined,
  upper_bound: number,
  lower_bound: number,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const price_ABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price_DEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = price_ABC / price_DEF;
    const UpperBound = 1.05;
    const LowerBound = 0.95;
    return {
      price_abc: price_ABC,
      price_def: price_DEF,
      ratio: ratio,
      trigger_alert: (ratio>UpperBound || ratio<LowerBound) ? ratio : undefined,
      upper_bound: UpperBound,
      lower_bound: LowerBound,
      timestamp: serverResponds[0].timestamp>serverResponds[1].timestamp?serverResponds[0].timestamp:serverResponds[1].timestamp,
    };
  }
}
