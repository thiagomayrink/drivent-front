import api from "./api";
import AuthenticatedApi from "./AuthenticatedApi";

export default class ActivityApi extends AuthenticatedApi {
  async getActivities() {
    const activities = await api.get("/activity", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
    return activities.data;
  }

  async getLocations() {
    const locations = await api.get("/location", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
    return locations.data;
  }

  async chooseActivity(activityId) {
    const activity = await api.post(
      `/activity/${activityId}`,
      {},
      {
        headers: {
          ...this.getAuthorizationHeader(),
        },
      }
    );
    return activity.data;
  }
}
