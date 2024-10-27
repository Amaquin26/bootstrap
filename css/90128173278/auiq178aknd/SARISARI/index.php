<?php 
	include('dbhelper.php');
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie-edge,safari">
		<link rel="stylesheet" href="w3.css">
		<title>Sari-Sari Store v1.0</title>
	</head>
	<body>
		<div class="w3-bar w3-container w3-padding w3-pink">
			<h3>Products</h3>
			<div class="w3-right">
				<a href="index.php" class='w3-button'>HOME</a>
				<a href="sales.php" class='w3-button'>SALES</a>
			</div>
		</div>
		<div class="w3-container w3-padding">
			<?php
				$products = getall_records('products');
				echo "<table class='w3-table-all w3-card-4 w3-animate-top'>";
				echo "<tr>";
					echo "<th>ID</th>";
					echo "<th>CODE</th>";
					echo "<th>NAME</th>";
					echo "<th>PRICE</th>";
					echo "<th>UNIT</th>";
				echo "</tr>";
				foreach($products as $product){
					echo "<tr>";
						echo "<td>".$product['product_id']."</td>";
						echo "<td>".strtoupper($product['product_code'])."</td>";
						echo "<td>".strtoupper($product['product_name'])."</td>";
						echo "<td>".number_format($product['product_price'],2)."</td>";
						echo "<td>".strtoupper($product['product_unit'])."</td>";
					echo "</tr>";
				}
				echo "<table>";
			?>
		</div>
	</body>
</html>