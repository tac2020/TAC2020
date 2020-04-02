package tac.india.cheal.patients.ui.dashboard;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import tac.india.cheal.R;
import tac.india.cheal.patients.ui.dashboard.data.DashboardItem;


public class DashboardActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        GridView dashboardGridView = findViewById(R.id.gv_dashboard);
        DashboardGridAdapter dashboardGridViewAdapter = getDashboardGridAdapter(this);
        dashboardGridView.setAdapter(dashboardGridViewAdapter);
        dashboardGridView.setOnItemClickListener(this);
    }

    private DashboardGridAdapter getDashboardGridAdapter(Activity activity) {
        List<DashboardItem> data = new ArrayList<DashboardItem>();
        data.add(new DashboardItem("Add Patient","Adds a New Patient"));
        data.add(new DashboardItem("Update Patient","Update Patient Data"));
        data.add(new DashboardItem("Remove Patient","Remove Patient Data"));
        data.add(new DashboardItem("Notify Patient","Notifies a Patient"));
        DashboardGridAdapter gridAdapter = new DashboardGridAdapter(activity,data);
        return gridAdapter;
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        switch (i){
            case 0:
                Toast.makeText(this, "Add Patient Clicked", Toast.LENGTH_SHORT).show();
                break;
            case 1:
                Toast.makeText(this, "Update Patient Clicked", Toast.LENGTH_SHORT).show();
                break;
            case 2:
                Toast.makeText(this, "Remove Patient Clicked", Toast.LENGTH_SHORT).show();
                break;
            case 3:
                Toast.makeText(this, "Notify Patient Clicked", Toast.LENGTH_SHORT).show();
                break;
        }
    }
}
