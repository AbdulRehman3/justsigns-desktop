import { v4 as uuidv4 } from 'uuid';

export const generateUniqueId = () => {
    const uuidCode = uuidv4();
    return uuidCode;
}