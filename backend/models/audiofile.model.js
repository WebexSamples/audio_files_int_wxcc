import { contentType, links } from "express/lib/response";
import mongoose, { version } from "mongoose";

const audioFileSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    blobId: { type: String, required: true },
    organizationId: { type: String, required: true },
    url: { type: URL, required: true },
    createdTime: { type: BigInt64Array, required: true },
    lastUpdatedTime: { type: BigInt64Array, required: true },
    version: { type: Int32, required: true },
}, {
    timestamps: true // createdAt and updatedAt fields
});

const AudioFile = mongoose.model('AudioFile', audioFileSchema);

export default AudioFile;