package tac.india.cheal.patients.ui.dashboard.data;


public class DashboardItem {
    private String Title;

    public DashboardItem() {
    }

    public DashboardItem(String title, String subTitle) {
        Title = title;
        this.subTitle = subTitle;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    private String subTitle;
}
