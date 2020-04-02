package tac.india.cheal.patients.ui.dashboard;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.List;

import tac.india.cheal.R;
import tac.india.cheal.patients.ui.dashboard.data.DashboardItem;


class DashboardGridAdapter extends BaseAdapter {
    private Context context;
    private View view;
    private List<DashboardItem> dashboardItems;

    public DashboardGridAdapter() {
    }

    public DashboardGridAdapter(Context context,  List<DashboardItem> dashboardItems) {
        this.context = context;

        this.dashboardItems = dashboardItems;
    }

    @Override
    public int getCount() {
        if(dashboardItems != null){
            return dashboardItems.size();
        }else{
            return 0;
        }

    }

    @Override
    public Object getItem(int i) {
        return dashboardItems.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        view = View.inflate(context, R.layout.dashboard_grid_item,null);
        DashboardItem item = dashboardItems.get(i);
        TextView tvTitle = view.findViewById(R.id.tvTitle);
        TextView tvSubtitle = view.findViewById(R.id.tvSubtitle);
        tvTitle.setText(item.getTitle());
        tvSubtitle.setText(item.getSubTitle());
        return view;
    }
}
