package tac.india.cheal.patients.ui;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.material.textfield.TextInputEditText;

import tac.india.cheal.R;

public class LoginActivity extends AppCompatActivity {

    private class Holder{
        private TextInputEditText tietUsername, tietPassword;
        private Button btnLogin;

        public TextInputEditText getTietUsername() {
            return tietUsername;
        }

        public void setTietUsername(TextInputEditText tietUsername) {
            this.tietUsername = tietUsername;
        }

        public TextInputEditText getTietPassword() {
            return tietPassword;
        }

        public void setTietPassword(TextInputEditText tietPassword) {
            this.tietPassword = tietPassword;
        }

        public Button getBtnLogin() {
            return btnLogin;
        }

        public void setBtnLogin(Button btnLogin) {
            this.btnLogin = btnLogin;
        }
    }
    private Holder viewHolder;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        viewHolder = new Holder();
        bindHolder();
        viewHolder.getBtnLogin().setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(viewHolder.getTietPassword().getEditableText().toString().equals("123")){
                    Intent dashboardActivityIntent = new Intent(LoginActivity.this,
                            DashboardActivity.class);
                    startActivity(dashboardActivityIntent);
                }else{
                    Toast.makeText(LoginActivity.this, "Incorrect Password, Try Again", Toast.LENGTH_SHORT).show();
                }
            }
        });

    }

    private void bindHolder() {

        viewHolder.setBtnLogin((Button) findViewById(R.id.btn_login));
        viewHolder.setTietPassword((TextInputEditText) findViewById(R.id.tiet_password));
        viewHolder.setTietUsername((TextInputEditText) findViewById(R.id.tiet_username));

    }
}
