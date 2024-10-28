<?php 
    require_once('dbhelper.php');

    $students = get_process("SELECT users.id,users.lastname,users.firstname,classes.classname,classes.timein,classes.timeout,users.isgood,COALESCE(users.isgood,'no') as ident FROM users LEFT JOIN classes ON users.id = classes.userid");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="tailwind.js"></script>
    <title>Document</title>
</head>
<body>
    <div class="p-4">
        <h3 class="text-xl">List of Students</h3>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Class name</th>
                    <th>Is Good</th>
                    <th>ident</th>
                    <th>timein</th>
                    <th>timeout</th>
                    <th>time diff</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($students as $student): ?>
                    <tr>
                        <td><?= $student["id"]?></td>
                        <td><?= $student["lastname"]?></td>
                        <td><?= $student["firstname"]?></td>
                        <td><?= $student["classname"] ?></td>
                        <td><?= $student["isgood"] == true ? "good" : "bad" ?></td>
                        <td><?= $student["ident"] ?></td>
                        <td>
                            <?php 
                                $timein = DateTime::createFromFormat("Y-m-d H:i:s",$student["timein"]);
                                if($timein){
                                    echo $timein->format("F j, Y");
                                }
                            ?>
                        </td>
                        <td><?= $student["timeout"] ?></td>
                        <td>
                            <?php 
                                $timein = new DateTime($student["timein"]);
                                $timeout = new DateTime($student["timeout"]);
                                if($timein && $timeout){
                                    $interval = $timein->diff($timeout);
                                    echo $interval->h * 60 + $interval-> i;
                                    //echo $timein->format("F j, y H:i:s");
                                }else{
                                    echo "no diff";
                                }
                            ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>