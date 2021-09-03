import api from "./api";
import AuthenticatedApi from "./AuthenticatedApi";

export default class HotelApi extends AuthenticatedApi {
  async getHotels() {
    const hotels = await api.get("/hotel", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
    return hotels.data;
  }

  async getHotelRooms(id) {
    const rooms = await api.get(`/hotel/${id}/rooms`, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
    return rooms.data;
  }

  reserveRoom(roomId) {
    return api.post(`/hotel/${roomId}/rooms`, {}, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
