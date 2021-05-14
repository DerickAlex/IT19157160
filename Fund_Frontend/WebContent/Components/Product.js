$(document).ready(function() {
	$("#alertSuccess").hide();
	$("#alertSuccess").hide();

});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateProductForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------

	var type = ($("#hidpIdSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "ProductAPI",
		type : type,
		data : $("#formProduct").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onOrdSaveComplete(response.responseText, status);
		}
	});
});


function onProductSaveComplete(response, status) {
	
	
	if (status == "success") {
		var resultSet = JSON.parse(response);

    if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divProductGrid").html(resultSet.data);

		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();

	} 

	else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	
	$("#hidOrdIDSave").val("");
	$("#formOrd")[0].reset();
}

// UPDATE==========================================
$(document).on(	"click",".btnUpdate",function(event) {
	
	$("#hidpIdSave").val($(this).data("pId")); 
	 $("#pTitle").val($(this).closest("tr").find('td:eq(0)').text()); 
	 $("#pDesc").val($(this).closest("tr").find('td:eq(1)').text()); 
	 $("#pPrice").val($(this).closest("tr").find('td:eq(2)').text()); 
	 $("#resName").val($(this).closest("tr").find('td:eq(3)').text());
	 $("#date").val($(this).closest("tr").find('td:eq(4)').text());
	 
		});

// REMOVE==========================================
$(document).on("click", ".btnRemove", function(event)
		{ 
		 $.ajax( 
		 { 
		 url : "ProductAPI", 
		 type : "DELETE", 
		 data : "pId=" + $(this).data("pId"),
		 dataType : "text", 
		 complete : function(response, status) 
		 { 
		 onProductDeleteComplete(response.responseText, status); 
		 } 
		 }); 
		});


function onOrdProductComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divOrdGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}