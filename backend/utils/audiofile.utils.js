import dotenv from 'dotenv'
import axios from 'axios'
import User from "../models/user.model.js";
import AudioFile from '../models/audiofile.model.js';
import { Blob } from 'blob-polyfill';
import FormData from 'form-data';
import fs from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import { rejects } from 'assert';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function writeFileLocally(file) {
  return new Promise((resolve, reject) => {
    const tempFilePath = path.join(__dirname, file.file.originalname);
    fs.writeFile(tempFilePath, file.file.buffer, (err) => {
      if (err) {
        reject(err);
      } else {
          resolve(tempFilePath);
      }
    });
  });
}

function readFileLocally(filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export const listAudioFilesApi = async function (accessToken, orgid) {
    const response = await axios.get(`https://api.wxcc-us1.cisco.com/organization/${orgid}/v2/audio-file`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }).catch(error => {
        if (error.response) {
          console.error('Request failed with status:', error.response.status);
          if (error.response.status === 404) {
            console.warn('Resource not found.');
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error during request setup:', error.message);
        }

        return {
            success: false,
            message: error.message || 'An error occurred when accessing audio files.',
            code: error.code || 'AUDIO_FILES_ERROR'
        };
      });

    return response.data;
}

export const deleteAudioFileApi = async function (id, accessToken, org_id) {

  const file = await AudioFile.findById(id).exec();

  console.log("file : ", file.name);
  console.log("webex id : ", file.id);
  console.log("mongo id : ", id);
  console.log("access token : ", accessToken);

  const response = axios.delete(`https://api.wxcc-us1.cisco.com/organization/${org_id}/audio-file/${file.id}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
  return response.data;
}

export const createAudioFileApi = async function (file) {
  const query = User.findOne({ email: file.email });
  query.getFilter();
  const user = await query.exec();
  const formData = new FormData();

  const fileInfo = {
    name: file.name,
    contentType: 'AUDIO_WAV',
    systemDefault: false
  }

  console.log('fileInfo in util : ', fileInfo);

  const writeFile = await writeFileLocally(file);
  console.log(writeFile);

  formData.append('audioFile', fs.createReadStream(writeFile), {
    contentType: 'audio/wav'
  });

  formData.append('audioFileInfo', JSON.stringify(fileInfo), {
    contentType: 'application/json'
  });

  //console.log('FORM DATA : ', formData);
  const response = await axios.post(`https://api.wxcc-us1.cisco.com/organization/${user.orgId}/audio-file`, formData, {
    headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${user.accessToken}`
    }
}).catch(error => {
    if (error.response) {
      console.error('Request failed with status:', error.status);
      if (error.response.status === 404) {
        console.warn('Resource not found.');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error during request setup:', error.message);
    }

    return {
        success: false,
        message: error.message || 'An error occurred when accessing audio files.',
        code: error.code || 'AUDIO_FILES_ERROR'
    };
  });

  return response.data;
}

export const updateAudioFileApi = async function (id, email, description) {
  const query = User.findOne({ email: email });
  query.getFilter();
  const user = await query.exec();
}

export const deleteAudioFile = async function (accessToken) {

}

export const partiallyUpdateAudioFiles = async function (id, email, description) {
  const query = User.findOne({ email: email });
  query.getFilter();
  const user = await query.exec();

  const data = {
    description: description
  }

  console.log("id in partially updated : ", id);
  console.log("access token : ", user.accessToken);

  const response = await axios.patch(`https://api.wxcc-us1.cisco.com/organization/${user.orgId}/audio-file/${id}`, data, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    }
  }).catch(error => {
    if (error.response) {
      console.error('Request failed with status:', error.status);
      if (error.response.status === 404) {
        console.warn('Resource not found.');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error during request setup:', error.message);
    }

    return {
        success: false,
        message: error.message || 'An error occurred when accessing audio files.',
        code: error.code || 'AUDIO_FILES_ERROR'
    };
  });
  console.log('status in partially updated : ', response.status);
  return response.data;
}

export const getReferences = async function (accessToken) {

}

