"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchRandomUsers = (limit) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://randomuser.me/api/?results=${limit}`);
    return response.data.results;
});
let cachedUsers = [];
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit) || 10;
        //verificar si los users ya estan en cache y si la cantidad solicitada es menor o igual al tamaño de la cache
        if (cachedUsers.length >= limit) {
            res.json(cachedUsers.slice(0, limit));
        }
        else {
            //si no hay suficientes users en cache, obtener mas de la API randomuser.me
            const users = yield fetchRandomUsers(limit);
            cachedUsers = users;
            res.json({ cachedUsers });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getUsers = getUsers;
