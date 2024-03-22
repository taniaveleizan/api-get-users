"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.host = exports.password = exports.user = exports.database = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.database = process.env.DB_DATABASE || 'postgres';
exports.user = process.env.DB_USERNAME || 'postgres';
exports.password = process.env.DB_PASSWORD || '';
exports.host = process.env.DB_HOST || 'localhost';
