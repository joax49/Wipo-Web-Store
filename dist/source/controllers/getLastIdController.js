import { returnLastId } from "../database/getLastId.js";
export async function getLastIdController(req, res) {
    const id = await returnLastId();
    if (typeof id === "number")
        return res.status(200).json({ "id": id });
}
//# sourceMappingURL=getLastIdController.js.map