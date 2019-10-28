let url = "http://localhost:8080/blog-posts";

function refreshList() {
    $.getJSON(url, (res) =>  {
        if (res.ok) {
            return res.json();
        }
        throw "Something wrong happened. Please try again";
    })
    .then(function(resposneJSON) {
        var ht = "";

        $.each(resposneJSON, function(i, val) {
            ht += `
                <li>${JSON.stringify(val)}</li>
            `;
        });

        $("#postList").html(ht);
    })
    .catch(function(error) {
        $("#error").html(error);
    });
}

$(document).ready(function() {

    $("#postPost").on("submit", function(event) {
        event.preventDefault();

        var req = {
            "title": $("#ptitle").val(),
            "content": $("#pcontent").val(),
            "author": $("#pauthor").val(),
            "datePublished": $("#pdatePublished").val(),
        };

        $.ajax({
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(req),
            dataType: 'application/json',
            type: 'POST',
            success: function(resposneJSON) {
                refreshList();
            }
        });
    });

    $("#deletePost").on("submit", function(event) {
        event.preventDefault();

        $.ajax({
            url: url + $("#dpostId").val(),
            dataType: 'application/json',
            type: 'DELETE',
            success: function(resposneJSON) {
                refreshList();
            }
        });
    });

    $("#updatePost").on("submit", function(event) {
        event.preventDefault();

        var req = {};

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
            req["datePublished"] = $("#udatePublished").val();
        }

        $.ajax({
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(req),
            dataType: 'application/json',
            type: 'PUT',
            success: function(resposneJSON) {
                refreshList();
            }
        });
    });

    refreshList();
});