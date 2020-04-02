package tac.india.cheal.patients.data;

//Panic Button is also needed
public class Issue {
    public static enum Type{
        DRY_COUGH,//Scale 1-10
        WET_COUGH,//Scale 1-10
        FATIGUE,//Scale 1-10
        LOSS_OF_SMELL,//Scale 1-10
        LOSS_OF_TASTE,//Scale 1-10
        FEVER,//Temperature
        PANIC,
        BREATHING_DIFFICULTY
    }

    private int id;
    private String type;

    public Issue() {
    }

    public Issue(int id, String type) {
        this.id = id;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
