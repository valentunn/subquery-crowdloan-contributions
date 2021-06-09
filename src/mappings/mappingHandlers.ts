import {SubstrateEvent} from "@subql/types";
import {Contribution} from "../types";

function eventId(event: SubstrateEvent): string {
    return `${event.block.block.header.number.toString()}-${event.idx}`
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [contributor, paraId, amount]}} = event;

    const record = new Contribution(eventId(event));

    record.amount = amount.toString();
    record.contributorAddress = contributor.toString()
    record.parachainId = paraId.toString()
    record.timestamp = event.block.timestamp.getTime().toString()

    await record.save();
}

