let url = "http://localhost:8080/blog-posts/";

$(document).ready(function() {

    function refreshList() {

        $.ajax({
            url: url,
            type: 'GET',
            success: function(responseJSON) {
                var ht = "";
    
                $.each(responseJSON, function(i, val) {
                    ht += `
                        <li>${JSON.stringify(val)}</li>
                    `;
                });
    
                console.log(ht);
    
                $("#postList").html(ht);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(`${xhr.status}: ${thrownError}`);
                $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
            }
        });
    }

    $("#postPost").on("submit", function(event) {
        event.preventDefault();

        var req = {
            "title": $("#ptitle").val(),
            "content": $("#pcontent").val(),
            "author": $("#pauthor").val(),
            "publishedDate": $("#pdatePublished").val(),
        };

        $.ajax({
            url: url,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(req),
            processData: false,
            success: function(responseJSON){
                console.log("success create");
                var ht = `
                        <li>${JSON.stringify(responseJSON)}</li>
                    `;
    
                $("#postList").append(ht);
            },
            error: function( xhr, textStatus, thrownError) {
                console.log(`${xhr.status}: ${thrownError}`);
                $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
            }
        });
    });

    $("#deletePost").on("submit", function(event) {
        event.preventDefault();

        $.ajax({
            url: url + $("#dpostId").val(),
            type: 'DELETE',
            success: function(responseJSON) {
                console.log("success delete");
                var ht = "";
    
                $.each(responseJSON, function(i, val) {
                    ht += `
                        <li>${JSON.stringify(val)}</li>
                    `;
                });
    
                console.log(ht);
    
                $("#postList").html(ht);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(`${xhr.status}: ${thrownError}`);
                $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
            }
        });
    });

    $("#updatePost").on("submit", function(event) {
        event.preventDefault();

        var req = {};

        if (($("#upostId").val()).length > 0) {
            req["id"] = $("#upostId").val();
        }
        if (($("#utitle").val()).length > 0) {
            req["title"] = $("#utitle").val();
        }
        if (($("#ucontent").val()).length > 0) {
            req["content"] = $("#ucontent").val();
        }
        if (($("#uauthor").val()).length > 0) {
            req["author"] = $("#uauthor").val();
        }
        if (($("#udatePublished").val()).length > 0) {
            req["publishedDate"] = $("#udatePublished").val();
        }

        $.ajax({
            url: url + $("#upostId").val(),
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(req),
            processData: false,
            success: function(responseJSON){
                console.log("success update");
                var ht = "";
    
                $.each(responseJSON, function(i, val) {
                    ht += `
                        <li>${JSON.stringify(val)}</li>
                    `;
                });
    
                console.log(ht);
    
                $("#postList").html(ht);
            },
            error: function( xhr, textStatus, thrownError) {
                console.log(`${xhr.status}: ${thrownError}`);
                $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
            }
        });
    });

    refreshList();
});